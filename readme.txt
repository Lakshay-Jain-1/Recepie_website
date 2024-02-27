Logic
created a database and filled with json data 
created an api using node js to access data and used good ui to display it and added good features like scrolling
clicking on the container will give out the ingrdients , done through api handling

// one more important middleware 
cors (if you don't use it will give an error , bcoz browser doesn't allow info to pass from one origin(diff url) to different origin(diff url))

creating your recepie (that is main feature)
used post method api in node js 
for image
used multer(it is a middleware that takes image from the frontend and uploads into my server in easy lanuage )

for ingrdients ,
i used fs , it is a node js module  
i used a method to read the file of content and split method on the basis of , into an array and then store it 


//---
in frontend js 
when i was adding url some part was same only file name was changing

for search i just implemented forEach on query selector .card and check the search.value if it matcches then inserted data