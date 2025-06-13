const questions = [
  {
    question: "Which of these items is recyclable?",
    options: ["Plastic bottle", "Styrofoam", "Battery", "Food waste"],
    answer: "Plastic bottle"
  },
  {
    question: "Where should e-waste be disposed?",
    options: ["Recycling bin", "Landfill", "E-waste center", "Compost bin"],
    answer: "E-waste center"
  },
  {
    question: "Which color bin is used for plastics?",
    options: ["Green", "Blue", "Red", "Yellow"],
    answer: "Blue"
  },
  {
    question: "What does the recycling symbol mean?",
    options: ["Single use", "Biodegradable", "Reusable", "Can be recycled"],
    answer: "Can be recycled"
  },
  {
    question: "Which material is non-recyclable?",
    options: ["Glass bottle", "Aluminum can", "Paper", "Soiled napkin"],
    answer: "Soiled napkin"
  },
  {
    question: "How long does it take for a plastic bottle to decompose?",
    options: ["450 years", "50 years", "10 years", "5 years"],
    answer: "450 years"
  },
  {
    question: "Which of these is a biodegradable waste?",
    options: ["Banana peel", "Plastic bag", "Glass bottle", "Metal can"],
    answer: "Banana peel"
  },
  {
    question: "What is composting?",
    options: ["Burning waste", "Decomposing organic waste into soil", "Recycling plastic", "Throwing trash in bin"],
    answer: "Decomposing organic waste into soil"
  },
  {
    question: "Which item belongs in a paper recycling bin?",
    options: ["Pizza box", "Magazine", "Plastic wrapper", "Aluminum foil"],
    answer: "Magazine"
  },
  {
    question: "Why should you rinse containers before recycling?",
    options: ["Remove odors", "Prevent contamination", "Make them shiny", "Save water"],
    answer: "Prevent contamination"
  },
  {
    question: "Which of these cannot be recycled?",
    options: ["Cardboard", "Glass bottle", "Styrofoam", "Aluminum can"],
    answer: "Styrofoam"
  },
  {
    question: "What type of waste is hazardous?",
    options: ["Battery", "Plastic bottle", "Paper", "Glass bottle"],
    answer: "Battery"
  },
  {
    question: "Which is the best way to reduce plastic waste?",
    options: ["Use reusable bags", "Throw in trash", "Burn plastic", "Recycle every item"],
    answer: "Use reusable bags"
  },
  {
    question: "What is the main purpose of recycling?",
    options: ["Save money", "Save energy and resources", "Produce more waste", "Create jobs"],
    answer: "Save energy and resources"
  },
  {
    question: "Which of these metals is commonly recycled?",
    options: ["Aluminum", "Lead", "Mercury", "Uranium"],
    answer: "Aluminum"
  },
  {
    question: "What happens if recyclable materials are mixed with trash?",
    options: ["Recycle anyway", "They get contaminated and wasted", "Become biodegradable", "Get burned efficiently"],
    answer: "They get contaminated and wasted"
  },
  {
    question: "Which is NOT a recyclable material?",
    options: ["Glass", "Plastic", "Food waste", "Paper"],
    answer: "Food waste"
  },
  {
    question: "How can you reduce waste?",
    options: ["Buy only what you need", "Throw everything away", "Use more plastic", "Burn trash"],
    answer: "Buy only what you need"
  },
  {
    question: "Which of these is reusable?",
    options: ["Plastic water bottle", "Disposable cup", "Glass jar", "Plastic straw"],
    answer: "Glass jar"
  },
  {
    question: "What is ‘upcycling’?",
    options: ["Recycling into lower quality", "Throwing waste away", "Reusing materials creatively", "Burning trash"],
    answer: "Reusing materials creatively"
  },
  {
    question: "Which bin should glass bottles be placed in?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: "Green"
  },
  {
    question: "Which of these is compostable?",
    options: ["Coffee grounds", "Plastic bag", "Aluminum foil", "Glass bottle"],
    answer: "Coffee grounds"
  },
  {
    question: "What does the chasing arrows symbol stand for?",
    options: ["Recycle", "Trash", "Compost", "Energy"],
    answer: "Recycle"
  },
  {
    question: "Which of these contributes most to landfill waste?",
    options: ["Food scraps", "Plastic bottles", "Metal cans", "Glass jars"],
    answer: "Food scraps"
  },
  {
    question: "What is the ‘reduce’ part of the 3 Rs?",
    options: ["Using less resources", "Throwing less waste", "Recycling more", "Buying more products"],
    answer: "Using less resources"
  },
  {
    question: "Which plastic is most recyclable?",
    options: ["PET (Polyethylene Terephthalate)", "PVC", "Polystyrene", "Polycarbonate"],
    answer: "PET (Polyethylene Terephthalate)"
  },
  {
    question: "Why is recycling important for the environment?",
    options: ["Reduces pollution", "Increases waste", "Uses more energy", "Creates more trash"],
    answer: "Reduces pollution"
  },
  {
    question: "Which is an example of hazardous household waste?",
    options: ["Paint", "Paper", "Plastic bottle", "Aluminum can"],
    answer: "Paint"
  },
  {
    question: "How should batteries be disposed?",
    options: ["In hazardous waste bins", "In recycling bins", "In compost", "In regular trash"],
    answer: "In hazardous waste bins"
  },
  {
    question: "What is landfill?",
    options: ["Place for waste disposal", "Recycling plant", "Composting site", "Plastic factory"],
    answer: "Place for waste disposal"
  },
  {
    question: "Which is better for the environment?",
    options: ["Reusable bags", "Single-use plastic bags", "Styrofoam containers", "Plastic wrap"],
    answer: "Reusable bags"
  },
  {
    question: "Which of these is a benefit of recycling?",
    options: ["Saves natural resources", "Increases pollution", "Uses more energy", "Creates more waste"],
    answer: "Saves natural resources"
  },
  {
    question: "What material is recycled to make new aluminum cans?",
    options: ["Old aluminum cans", "Plastic bottles", "Glass bottles", "Paper"],
    answer: "Old aluminum cans"
  },
  {
    question: "Which of these items should NOT be put in a recycling bin?",
    options: ["Plastic bags", "Aluminum cans", "Glass bottles", "Paper"],
    answer: "Plastic bags"
  },
  {
    question: "What is the best way to reduce waste at home?",
    options: ["Composting", "Burning trash", "Throwing everything away", "Using disposable products"],
    answer: "Composting"
  },
  {
    question: "Which material breaks down fastest in landfill?",
    options: ["Food waste", "Plastic", "Glass", "Metal"],
    answer: "Food waste"
  },
  {
    question: "Why should we avoid single-use plastics?",
    options: ["They create pollution and waste", "They are reusable", "They are biodegradable", "They are cheap"],
    answer: "They create pollution and waste"
  },
  {
    question: "Which bin is usually for organic waste?",
    options: ["Brown", "Blue", "Green", "Yellow"],
    answer: "Brown"
  },
  {
    question: "Which of these can be recycled multiple times?",
    options: ["Glass", "Plastic", "Food waste", "Styrofoam"],
    answer: "Glass"
  },
  {
    question: "What is a ‘zero waste’ lifestyle?",
    options: ["Producing no waste", "Throwing away more trash", "Using more plastic", "Burning waste"],
    answer: "Producing no waste"
  },
  {
    question: "Which of these can be reused as a container?",
    options: ["Glass jar", "Plastic wrap", "Styrofoam cup", "Plastic straw"],
    answer: "Glass jar"
  },
  {
    question: "What is the first step in the waste hierarchy?",
    options: ["Reduce", "Recycle", "Reuse", "Dispose"],
    answer: "Reduce"
  },
  {
    question: "Which of the following is NOT recyclable?",
    options: ["Food-contaminated paper", "Clean cardboard", "Glass bottles", "Metal cans"],
    answer: "Food-contaminated paper"
  },
  {
    question: "How can you help reduce electronic waste?",
    options: ["Donate old devices", "Throw in trash", "Burn devices", "Ignore recycling"],
    answer: "Donate old devices"
  },
  {
    question: "Which symbol indicates a product is recyclable?",
    options: ["Three chasing arrows", "Trash bin", "Leaf", "Circle with X"],
    answer: "Three chasing arrows"
  },
  {
    question: "What does ‘biodegradable’ mean?",
    options: ["Breaks down naturally", "Does not decompose", "Creates pollution", "Is made of plastic"],
    answer: "Breaks down naturally"
  },
  {
    question: "Which of these items is hazardous to the environment if thrown in trash?",
    options: ["Battery", "Plastic bottle", "Paper", "Glass jar"],
    answer: "Battery"
  },
  {
    question: "What’s one way to encourage recycling?",
    options: ["Use clearly labeled bins", "Mix trash and recyclables", "Burn waste", "Ignore sorting"],
    answer: "Use clearly labeled bins"
  }
];

export default questions;