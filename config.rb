# Require any additional compass plugins here.
require './app'

# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "sass"


# Require any additional compass plugins here.



css_dir = "public/stylesheets"
http_stylesheets_path = "/stylesheets"
images_dir = "public/images"
http_images_path = "/images"
javascripts_dir = "public/javascripts"
http_javascripts_path = "/javascripts"

output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true
relative_assets = false

line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass stylesheets scss && rm -rf sass && mv scss sass
preferred_syntax = :scss
