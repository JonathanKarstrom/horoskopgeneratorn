# horoskopgeneratorn
###### Author: Jonathan Karstr?m
###### Repo: https://github.com/JonathanKarstrom/horoskopgeneratorn
Web Application to create and distribute crowd sourced horoscopes. Only available in Swedish for the moment. This app uses Heroku for build and hosting

## Functionality

This app uses a mongoDB to store tre sets of phrases and then uses these three parts to randomly create a horoscope.
A user can input new suggestions of phrases that the moderator (me for the moment) then approves or decline.
The site is updated at the moment every 10 minutes as a workaround for Herokus hosting solutions. (It requires activity on the page every 30 mins or the server is shut down).

## Voting

Users can vote on different horoscopes but a User can only upvote and downvote once per every hour. If a horoscope is downvoted to -5 it will be replaced by a new horoscope.

## TODOS

+ Fix links in navigation
+ Create API-keys for sensitive operations as updating and removing approved phrases and updating horoscopes.
+ Rework of the layout to be more user friendly.
+ Genereal rewriting of code to make it more readable.