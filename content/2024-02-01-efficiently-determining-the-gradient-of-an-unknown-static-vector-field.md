---
title: "Efficiently Determining the Gradient of an Unknown Static Vector Field"
created: 2024-01-31T21:18:16-06:00
date: 2024-02-01T12:02:38-0600
draft: true
slug: efficiently-determining-the-gradient-of-an-unknown-static-vector-field
description: Typically, when I'm doing a sketch with a flow field, the vector field is defined by some spatial function. In this case, the field was static but unknown, and it was a fun mental exercise to figure out how I could calculate the gradient efficiently.
tags: [math, art]
---

## TLDR

Recently I [created a sketch using a flow field based on an SDF](https://ericyd.github.io/generative-art/?thingy=genuary2024-29&which-one=0). As far as I know, SDFs aren't typically used to define a vector field, and I had never calculated the gradient of an unknown vector field before. Typically, when I'm doing a sketch with a flow field, the vector field is defined by some spatial function. In this case, the field was static but unknown, and it was a fun mental exercise to figure out how I could calculate the gradient efficiently. I wanted to share my process!

## Result

This is the sketch I created. Note that the middle of the sketch mixes the gradient with a curl noise function; the SDF gradient isn't that curvy!

![Resulting flow field sketch. Lines start at the outer edges and move towards the middle. They start relatively straight, and by the time they have reached the center, the lines are quite curly and do not follow a discernable pattern.](https://res.cloudinary.com/ericyd/image/upload/c_scale,w_500/v1706757293/art/240129-Genuary2024_29_2024-01-31T17-55-41-126Z-seed-3016182276706477.svg_t1nkwc.png)

## Process

If you prefer to read code, you can find a [detailed breakdown of my algorithm in my generative art repo](https://github.com/ericyd/generative-art/blob/4357cda0f375e32f982f126f0ac7e7131b89ea02/homegrown-svg/sketch/240129-Genuary2024_29.js#L92-L146). For everyone else, read ahead! If you aren't familiar with SDFs (like me a week ago), I'd highly recommend checking out [Piter's explanation in this YouTube video](https://www.youtube.com/watch?v=KRB57wyo8_4). The first 10 minutes or so cover the core ideas.

My goal was to be able to calculate the gradient defined by the SDF at any point in space. First a little terminology that I use:

- `point` refers to a 2D point in Cartesian space, i.e. an `(x, y)` coordinate pair
- `SDF value` refers to the value returned from my SDF function for a given `point`. It doesn't really matter how the SDF is defined, other than it must return a single scalar number.
- `SDF difference` refers to the difference between the `SDF value` at some sample point and the `SDF value` at my target `point`.
- `sample radius` refers to the radius of the circle from which we sample the SDF around our `point`. Sampling from a circle rather than random points around our target `point` is important.

Here was my process:

1. Sample the SDF value at three equally-spaced points around the `point`.
2. Calculate the SDF differences between the sample SDF values and the SDF value at `point`.
3. Interpolate between the two highest values to find the angle at which the difference is the greatest. The angle at which the SDF difference is greatest indicates the gradient, because this is the maximum difference between the `point` and the SDF values around the point.

There are a few important insights that make this algorithm work:

1. The maximum difference should be our "sample radius". In a simple example, we can take our sample points from the unit circle around `point`, in which case our sample radius is `1`.
2. We also know the SDF value is a simple measurement of distance. Therefore, the max difference should be equal to the radius of the circle from which the sample points were taken (which, in our example, is `1`).
3. An SDF measures the distance from a `point` to a shape. Therefore, the SDF values become larger as you move _away_ from the shape defined by the SDF, and smaller as you move _towards_ the shape. This means the _SDF difference_ will be negative when the SDF value is larger than the SDF value at `point`. (Example: if SDF at `point` is 0.5 and SDF of our sample point is 0.75, then the diff would be -0.25.) Therefore, the gradient moving _towards_ the shape will always be positive, because this will indicate the direction of *decreasing* SDF values.

Given this process overview and the insights, we can define our actual algorithm:

The detailed algorithm is as follows:
1. Define the radius of the circle from which we will sample the SDF. (Let's use `1` for simplicity.)
2. Define the three angles at which we will sample the SDF. (Let's use `0`, `2π/3`, and `4π/3` for simplicity.)
3. Sample the SDF at the three angles, and calculate the difference between the raw SDF value and the SDF value at `point`. (The SDF difference should be in range [-1, 1]).
4. Discard the lowest SDF difference. This indicates the point that is furthest away from the shape. The higher two values will be used to interpolate the gradient.
5. Define the rate of change of the SDF diff in "units per radian". Using a radius of 1, the rate of change will be `2/π` because the max and min will occur on opposite sides of the circle. The difference between max and min is 2, and that change takes place in half a rotation, so the rate of change on our circle is `2/π`. The units of this value are "SDF difference units per radian".
6. Choose one of the two remaining sample points, and calculate the SDF difference between the sample point and the maximum (aka the radius).
7. Calculate the difference in radians between the sample point and the "maximum" point (i.e. gradient). This is done by dividing the SDF difference by the rate of change. Dimensional analysis for this calculation gives us a result of "radians", which is what we want.
8. Calculate the absolute angle, in radians, of the gradient. Since we sampled from three equally-spaced and took the top two points, the maximum value will always lie in between these two points. I don't have a mathematical proof for this but I'm pretty sure it's correct. Please let me know if not!
9. Return a normalized 2D vector pointing in the direction of the gradient.

## Conclusion

I never know what to search for these types of algorithms. Is there a more efficient way to calculate the gradient of an unknown (but static) vector field? Let me know if I missed one! Don't be afraid to [check out my sample code](https://github.com/ericyd/generative-art/blob/4357cda0f375e32f982f126f0ac7e7131b89ea02/homegrown-svg/sketch/240129-Genuary2024_29.js#L92-L146) to see how I implemented this in JavaScript.

Happy coding!
