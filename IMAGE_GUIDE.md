# AK Studios Website - Image Management Guide

## 📸 Current Image Structure

Your website is set up with the following image files. Simply replace these placeholder files with your actual photos:

### 🏠 Hero Section
- `hero-bg.jpg` - Main background image (1920x1080px recommended)

### 👥 About Section  
- `about-team.jpg` - Team/personal photo (600x400px recommended)

### 🎯 Services Section
- `service-wedding.jpg` - Wedding photography sample
- `service-videography.jpg` - Videography/cinematography sample  
- `service-event.jpg` - Event photography sample
- `service-engagement.jpg` - Engagement session sample
- `service-photobooth.jpg` - Photo booth sample
- `service-bespoke.jpg` - Custom collections sample

### 🖼️ Portfolio Section (SIMPLIFIED NAMING!)
- `portfolio-1.jpg` - Portfolio photo 1
- `portfolio-2.jpg` - Portfolio photo 2  
- `portfolio-3.jpg` - Portfolio photo 3
- `portfolio-4.jpg` - Portfolio photo 4
- `portfolio-5.jpg` - Portfolio photo 5
- `portfolio-6.jpg` - Portfolio photo 6
- `portfolio-7.jpg` - Portfolio photo 7
- `portfolio-8.jpg` - Portfolio photo 8
- `portfolio-9.jpg` - Portfolio photo 9

## 🔄 How to Replace Portfolio Photos (SUPER EASY!)

1. **Take your best 9 photos**
2. **Rename them to:** portfolio-1.jpg, portfolio-2.jpg, portfolio-3.jpg, etc.
3. **Copy them to the images folder** - they will automatically replace the existing files
4. **Refresh your website** - your photos will appear in the slideshow!

## ➕ How to Add More Portfolio Photos

To add more photos to the slideshow:

1. **Add new image files** to the images folder (e.g., `portfolio-10.jpg`, `portfolio-11.jpg`)

2. **Update the HTML** in index.html by copying this pattern:

```html
<div class="slide">
    <img src="images/portfolio-10.jpg" alt="Portfolio Photo 10">
    <div class="slide-overlay">
        <h3>Our Work</h3>
        <p>Professional Photography</p>
    </div>
</div>
```

3. **Add a navigation dot** in the slideshow-nav section:
```html
<button class="nav-dot" data-slide="9"></button>
```

## 🎨 Image Optimization Tips

- **Portfolio Photos**: 800x800px (square) or 1200x800px (landscape) work best
- **File Format**: JPG for photos
- **File Size**: Keep under 500KB each for fast loading
- **Quality**: 80-85% quality is perfect for web

## 🚀 Quick Start for Portfolio

1. **Choose your 9 best photos**
2. **Resize them** to 800x800px or 1200x800px
3. **Rename them**: portfolio-1.jpg through portfolio-9.jpg
4. **Replace the files** in the images folder
5. **Refresh your website** - Done! 🎉

## 📱 Mobile Considerations

All portfolio images are automatically:
- **Responsive** - scale properly on mobile devices
- **Touch-friendly** - swipe left/right to navigate
- **Optimized** - automatically compressed for mobile viewing

The slideshow handles everything automatically - just add your photos with the correct names!
