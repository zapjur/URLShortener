package models

import "time"

type URL struct {
	ID          uint   `gorm:"primaryKey"`
	OriginalURL string `gorm:"type:text;not null"`
	ShortCode   string `gorm:"type:varchar(10);not null;unique"`
	CreatedAt   time.Time
}
