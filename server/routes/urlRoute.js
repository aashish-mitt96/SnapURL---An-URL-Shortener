import express from 'express'
import { handleAnalytics, handleGenerateShortUrl, handleRedirectUrl } from '../controllers/urlController.js'

const router = express.Router()

router.post('/shorten', handleGenerateShortUrl)
router.get('/:shortUrl', handleRedirectUrl)
router.get('/analytics/:shortUrl', handleAnalytics)

export default router