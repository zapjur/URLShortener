package controllers

import (
	"github.com/gin-gonic/gin"
	"math/rand"
	"net/http"
	"time"
	"url-shortener/models"
)

func generateShortCode(n int) string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	rand.Seed(time.Now().UnixNano())
	code := make([]byte, n)
	for i := range code {
		code[i] = charset[rand.Intn(len(charset))]
	}
	return string(code)
}

func ShortenURL(c *gin.Context) {
	var requestBody struct {
		OriginalURL string `json:"original_url" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	shortCode := generateShortCode(6)

	url := models.URL{OriginalURL: requestBody.OriginalURL, ShortCode: shortCode}
	result := models.DB.Create(&url)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save URL"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"short_url": "http://localhost:8080/" + shortCode})
}

func RedirectURL(c *gin.Context) {
	shortCode := c.Param("short_code")
	var url models.URL

	result := models.DB.Where("short_code = ?", shortCode).First(&url)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "URL not found"})
		return
	}

	c.Redirect(http.StatusMovedPermanently, url.OriginalURL)
}
