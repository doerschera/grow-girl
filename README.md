# [You Grow Girl!](https://pacific-reaches-45218.herokuapp.com/)

###Background

*You Grow Girl!* is a math-based game aimed to help young girls build confidence with basic addition, substraction, multiplication, and division. Game play centers around growing flowers and fighting weeds. Each time the correct answer is given the flower grows by a certain health percentage, while the health of the weed decreases. With each growth, the subsequent growth percentage of the flower increases by its initial percentage, for example: a flower with an initial growth of 4% grows by 8% the next time, and 12% the time after. The weed's health shrinks by the same percentage. However, with incorrect answers the weed grows and the flower shrinks, though this percentage is fixed. Once a flower reaches 100% it is added to a garden at the top of the page, allowing users to keep track of their success.

###Technology

-jQuery time intervals
- Bootstrap
- HTML/CSS
- Illustration using Photoshop & Illustrator

###Process

The inspiration for *You Grow Girl!* stemmed from the girl-flower illustrations, which were based on the whimsical sunae (Japanese sand painting) work of the artist [Naoshi](http://www.nao-shi.com/English/Gallery/gallery/gallery11/gallery11.html). I wanted to create a game that was silly and inviting while as being encouraging and challenging. 

Users can choose from three different flowers and weeds, which represent different levels of study. The three flowers-- tulip, daisy, and sunflower-- are ranked on their difficulty to grow and have different starting health percentages. Tulips, the hardest to grow, start at 10% and have an initial growth rate of 3%. Daisies, the easiest to grow, start at 25% and have a growth rate of 5%. The three weeds correspond to different math levels: addition and subtraction only; addition, subtraction, multiplication, and division; and addition, subtraction, multiplication, and division with larger numbers.

One challenge I faced was writing a single function that I could apply to each operator button to determine which operator had been selected, as I was gathering the operator information from the inner HTML. I solved this problem by passing "this" as an argument to the function, allowing me to be specific about which operator and which set. Another option may have been to use the HTML data attribute.
