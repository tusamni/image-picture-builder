# Image Resize and Reformat

I needed a tool to locally build various resized and reformatted images for use in `<source>` tags. This is a quick and dirty tool to take a folder full of images (./input), resize them and reformat them into an output (./output) folder using Sharp.

To run the tool, place your images in the `input` folder, then simply run:

```npm run optimize```

The script will cycle through an array of sizes and formats you provide to create the needed images in the output folder.

When you're done with the images and want to clean the folders out:

```npm run clean```

Or just delete the input and output folders, the script will check and create them next time if need be.
