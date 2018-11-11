# DiceBag
## Github Pages: https://codyrdavis.github.io/DiceBag/

### By: Cody R Davis 2018

## Summary:
The goal of this project was to help speed up the math involved in playing Pathfinder/other D20 based game systems. Traditionally the process to Pathfinder would be; remember/look up what rolls need to be made, roll it, add the roles up, and finally add your bonus to this role. I wanted to make that process instant. Create a Dice for each situation and no need to look it up again, simply click your custom dice.

## Technology used:
HTML 5, CSS3, JavaScript.

## Room to improve:
while the final app is not done, the current scope leaves room for improvement. Such improvements are possible, and maybe in the near future will be something I step up to take a swing at. This includes tracking a characters attribures and other stats so that the "bonus" will become automized as well and no longer require the user to calculate all that up the first time they create the dice. The scope of that project would become a character sheet app. Tracking every piece of data about a character would be required to create the experiance I would expect from the next stage of this project.

One particular data point is giving me the most pause, Bonuses of the same type do not stack, and when one bonus expires the other one would take over. You cant have two luck bonuses to your attack rolls, the largest of the two should be active, and if that one becomes inactive, the other buff would take its place. There are many types of bonuses, so I'm not sure hard coding such bonus types would be plausable. Perhas just validating the users input, and then after a sort, only taking the first result from a contains query.
