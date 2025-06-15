I'm writing a thesis where I'm exploring the topic of testing different databases using YCSB benchmark.

You can find the thesis and thee current version of the presentation in the same "objective" folder.

Now, my scientific advisor told me to illustrate the whole proccess after the third slide. Like, what my system does, HOW it does it, all the processess, the loading phase, the run phase, how it reads the results, etc...

Everyhing must fit within the height and width of one slide, be super readable and more pictures, less words

We have a one-time load of each dataset after we've done the necessary adjustments (like flattening and/or other stuff) we create each time a new YCSB-compatible table for each workload the contents of which get overwritten with the real table's contents.

In try1.html you can see what I threw up for the reference. i'm not particularly happy with it. Not only are the contents missing some key points, the graphical appeal is far from perfect. I was thinking nice looking modes branching off when it comes to different workloads and stuff.

Tech stack:
React
TypeScript
D3.js
SCSS Modules
Any state management tool, should you need it
Lucide
Vite
Framer Motion
ANYTHING else required for this