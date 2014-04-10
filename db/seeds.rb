# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#

post_body = "Messenger bag hella VHS, ugh Marfa synth PBR&B jean shorts typewriter art party Brooklyn distillery biodiesel shabby chic keytar. Wayfarers aesthetic bespoke Intelligentsia Thundercats, try-hard normcore blog. Pork belly salvia stumptown, pug whatever before they sold out XOXO roof party viral trust fund fanny pack umami post-ironic. Farm-to-table four loko disrupt, PBR&B post-ironic YOLO slow-carb. Slow-carb hoodie Carles meh, Vice artisan polaroid bicycle rights. Selfies Helvetica Etsy, Carles cray retro 8-bit farm-to-table narwhal cardigan aesthetic jean shorts High Life McSweeney's. Selvage mumblecore shabby chic YOLO Intelligentsia.

Swag +1 semiotics Shoreditch DIY. Bitters Godard aesthetic, slow-carb freegan American Apparel hella twee Austin brunch food truck Blue Bottle 90's Carles forage. Master cleanse ennui distillery 8-bit freegan PBR. Williamsburg Neutra keffiyeh, normcore skateboard Thundercats. Cred yr deep v authentic aesthetic, pickled High Life slow-carb forage Vice Tumblr squid bicycle rights. Quinoa wayfarers ennui, pour-over food truck tofu Intelligentsia. Locavore fashion axe Pinterest, Etsy Godard iPhone put a bird on it small batch DIY biodiesel Odd Future forage."

10.times do |n|
  title = "Really Awesome Blog Post ##{n+1}"
  author = 'Somebody Awesome'

  Post.find_or_create_by(title: title, author: author, body: post_body)
end
