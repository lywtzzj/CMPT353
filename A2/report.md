# Test Report Yuwen Liu 11219371 yul905
1. How did you test your code?
   - The server.js file and post.html file are test cases for each other 
      - For server.js: if the server file works, html file  will send "post" and "get" requires to server for save data and get data, so the infos div will show the data which is saved by server.
      - For post.html: if the html file works, 
        - firstly, server file can take "POST" request and get all data which is inputed by user and save data into txt file.
        - secondly, sever can take "GET" request and read file send the content to html file.
2. How long does it take to process a single post?
   - set start time in top of onclicked function sendRequest() and end time after successed alert() so get time 3s for process a single post.
3. Does the size of the data submitted to the server impact the performance?
   - I try to input a bigger data for posting, but I didn't see a long time delay from server.
4. What happens if 2 requests are sent at nearly the same time data to the server?
   - I think the post request and get request are sended nearly same time but html refresh so fast so everything lookslike good in here.
