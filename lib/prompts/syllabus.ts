/**
 * Singapore Primary 5 Mathematics Syllabus (2021)
 * Official MOE curriculum - STRICTLY ENFORCE
 * Responsibility: Defines the syllabus strictly from where the questions will be generated
 * Used in: userPrompt.ts
 */

export const PRIMARY_5_SYLLABUS = `
# PRIMARY 5 MATHEMATICS SYLLABUS (2021) - OFFICIAL MOE CURRICULUM

You MUST generate problems ONLY from the topics listed below. Any topic not listed is FORBIDDEN.

## NUMBER AND ALGEBRA

### WHOLE NUMBERS
1. Numbers up to 10 million
   - Reading and writing numbers in numerals and in words
   
2. Four Operations
   - Multiplying and dividing by 10, 100, 1000 and their multiples (NO calculator)
   - Order of operations (NO calculator)
   - Use of brackets (NO calculator)

### FRACTIONS
1. Fraction and Division
   - Dividing a whole number by a whole number with quotient as a fraction
   - Expressing fractions as decimals
   
2. Four Operations
   - Adding and subtracting mixed numbers
   - Multiplying a proper/improper fraction and a whole number (NO calculator)
   - Multiplying a proper fraction and a proper/improper fraction (NO calculator)
   - Multiplying two improper fractions
   - Multiplying a mixed number and a whole number

### DECIMALS
1. Four Operations
   - Multiplying and dividing decimals (up to 3 decimal places) by 10, 100, 1000 and their multiples (NO calculator)
   - Converting measurements between units in decimal form:
     * Kilometres and metres
     * Metres and centimetres
     * Kilograms and grams
     * Litres and millilitres

### PERCENTAGE
1. Percentage
   - Expressing a part of a whole as a percentage
   - Use of % symbol
   - Finding a percentage part of a whole
   - Finding discount, GST and annual interest

### RATIO
1. Ratio (NEW in P5)
   - Comparing two or more quantities
   - Expressing ratio in simplest form
   - Finding one quantity when the other and ratio are known

### RATE
1. Rate (NEW in P5)
   - Rate as the amount of a quantity per unit of another quantity
   - Finding rate, total amount or number of units given the other two quantities

## MEASUREMENT AND GEOMETRY

### AREA AND VOLUME
1. Area of Triangle
   - Concepts of base and height of a triangle
   - Area of triangle formula
   - Finding area of composite figures (rectangles, squares, triangles)
   
2. Volume of Cube and Cuboid
   - Building solids with unit cubes
   - Measuring volume in cubic units (cm³/m³) - NO conversion between cm³ and m³
   - Drawing cubes and cuboids on isometric grid
   - Volume of cube/cuboid formula
   - Finding volume of liquid in rectangular tank
   - Relationship between ℓ (or ml) with cm³

### GEOMETRY
1. Angles
   - Angles on a straight line (180°)
   - Angles at a point (360°)
   - Vertically opposite angles
   - Finding unknown angles
   
2. Triangle
   - Properties of isosceles, equilateral, right-angled triangles
   - Angle sum of triangle (180°)
   - Finding unknown angles (NO additional construction of lines)
   
3. Parallelogram, Rhombus and Trapezium
   - Properties of each shape
   - Finding unknown angles (NO additional construction of lines)

### AVERAGE (STATISTICS)
1. Average (NEW in P5)
   - Finding the average given total and number of items
   - Finding total given average and number of items
   - Finding number of items given average and total

## STRICTLY FORBIDDEN TOPICS (NOT IN P5)
- Algebra and algebraic equations (P6 topic)
- Negative numbers and integers (P6 topic)
- Prime factorization (P6 topic)
- Probability (Secondary topic)
- Square roots and powers beyond basic squares
- Graphs and coordinate geometry
- Standard form/scientific notation
- Advanced trigonometry
- Circle properties and circumference
`;

export const FORBIDDEN_KEYWORDS = [
    'algebra', 'algebraic', 'equation', 'solve for x', 'x =',
    'negative number', 'integer', 'positive and negative',
    'prime factor', 'prime factorization',
    'probability', 'chance', 'likelihood',
    'square root', '√', 'power of', 'exponent',
    'coordinate', 'graph', 'plot',
    'scientific notation', 'standard form',
    'trigonometry', 'sine', 'cosine', 'tangent',
    'circumference', 'π', 'pi',
    'median', 'mode', 'range' // Statistics beyond average
];