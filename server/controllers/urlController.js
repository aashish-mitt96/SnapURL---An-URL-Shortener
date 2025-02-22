import ShortUniqueId from 'short-unique-id';
import urlModel from '../models/urlModel.js';

const uid = new ShortUniqueId({ length: 8 });

async function handleGenerateShortUrl(req, res) {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) {
            return res.status(400).json({ error: "Original URL is required" });
        }
        const shortUrl = uid.randomUUID();
        const newUrl = new urlModel({
            originalUrl,
            shortUrl,
            createdBy: req.user ? req.user._id : null
        });
        await newUrl.save();
        console.log("Short URL generated:", shortUrl);
        return res.json({ shortUrl, originalUrl });
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).json({ error: "Failed to generate short URL" });
    }
}

async function handleRedirectUrl(req, res) {
    try {
        const { shortUrl } = req.params;
        const url = await urlModel.findOneAndUpdate(
            { shortUrl },
            { $push: { visits: { timestamp: new Date() } } }, 
            { new: true }
        );
        if (!url) {
            console.error("Short URL not found:", shortUrl);
            return res.status(404).send("URL Not Found");
        }
        await url.save();
        return res.redirect(url.originalUrl);
    } catch (error) {
        console.error("Error redirecting URL:", error);
        return res.status(500).send("Internal Server Error");
    }
}

async function handleAnalytics(req, res) {
    try {
        const { shortUrl } = req.params;
        const url = await urlModel.findOne({ shortUrl });
        if (!url) {
            console.error("URL not found for analytics:", shortUrl);
            return res.status(404).json({ error: "URL not found" });
        }
        return res.json({ visits: url.visits });
    } catch (error) {
        console.error("Error retrieving analytics:", error);
        return res.status(500).json({ error: "Failed to retrieve analytics" });
    }
}

export { handleGenerateShortUrl, handleRedirectUrl, handleAnalytics };
