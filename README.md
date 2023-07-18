# Height Comparison Tool Template

Hello! I refactored my [Ensemble Stars Height Comparison tool](https://github.com/hellogirls-js/height-comparison) to be used for characters in any franchise (as long as you know their heights and transparent images of them). I'll run through the instructions on how to make this work here.

First, you must fork this repository and then clone the forked repository onto your own device. Feel free to rename the repository to just height-comparison or something else when you fork it.

## Images
All images that you use should be placed in the IMAGES folder. **These images must be transparent, no JPEGs/JPGs should be used.** Also, these images should ideally be cropped as much as possible for accuracy and ease of use. You can either crop the images manually, or use a command line tool called [ImageMagick](https://imagemagick.org/script/download.php) to crop it for you. 

In order to crop via ImageMagick, navigate to this repository's home folder on your computer. Then, run the following commands in your terminal:
```
cd IMAGES
mogrify -trim +repage *.png
```

This will trim every PNG in the IMAGES folder to be as cropped as possible.

You should also make sure all images have the same height. As an example, all of the renders I used for my Enstars height comparison tool are 2000px. This will make sure the heights are as accurate as possible. You can also do this manually.

## Data

All character data should be stored in the array present in `DATA.js`. Keep in mind the height should be in **centimeters**. I may consider implementing feet and inches in the future, we shall see. Copy the image path example in the `image_url` section to retrieve images from the IMAGE folder.

## Hosting

You can host your forked version of this site on GitHub Pages for free, yay! 

1. Navigate to your repository on GitHub and click the Settings tab at the top.
2. Under Code and automation, click Pages.
3. You have the option to deploy your main branch, so do that!
4. Your site should now be running under `http://[YOUR GITHUB USERNAME].github.io/[REPOSITORY NAME]`

## That's all!

If you have any questions, feel free to DM me on [Twitter](https://twitter.com/hellogirls_DEV) or shoot me an ask on [Retrospring](https://retrospring.net/@hellogirls) or [Tumblr](https://tumblr.com/hellogirls-dev). If you like what I'm doing, you can [buy me a coffee!](https://www.buymeacoffee.com/hellogirls)
