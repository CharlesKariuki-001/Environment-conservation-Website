import React from "react";
import "./EnvironmentComponents.css";
import { motion } from "framer-motion";

const EnvironmentComponents = () => {
  const components = [
    {
      name: "Atmosphere",
      description:
        "🌍✨ The atmosphere is like Earth's magical protective blanket, wrapping our planet in a delicate yet powerful embrace! 🌎💙 It’s a dynamic ocean of air that gives us the oxygen we breathe 🫁, shields us from harmful space radiation ☀️🛡️, and even paints our skies in breathtaking hues of blue and fiery sunsets! 🌅💙🔥 " +
        "Divided into layers—troposphere, stratosphere, mesosphere, thermosphere, and exosphere—each plays a vital role in maintaining life! 🌤️🌡️ From the troposphere, where our weather dances with the clouds ☁️🌦️, to the stratosphere, where the ozone layer defends us against UV rays 🏖️🕶️, the atmosphere is nothing short of a superhero! 🦸‍♂️🌬️ " +
        "But here’s the catch—pollution and climate change are threatening this delicate balance! 🚨💨 By reducing carbon emissions, planting trees 🌳🌱, and adopting eco-friendly habits, we can help keep our atmosphere clean and vibrant for generations to come! 💚🌍✨",
      images: ["air1.jpg", "air2.jpg", "air3.jpg", "air4.jpg", "air5.jpg", "air6.jpg"],
    },
    {
      name: "Hydrosphere",
      description:
        "💧🌊 The Hydrosphere is Earth’s **lifeblood**—a vast, shimmering network of oceans, rivers, lakes, and glaciers that nourishes every living being! 🌍💙 Covering about **71% of our planet**, it is home to countless marine creatures 🐠🐋, a crucial part of the water cycle 🌦️, and the ultimate source of life for all ecosystems! 🌱💦 " +
        "From the mighty crashing waves of the ocean 🌊🌊 to the serene flow of rivers 🏞️, the Hydrosphere connects us all. It regulates climate ❄️🔥, shapes landscapes, and keeps us hydrated 🥤. But with **pollution, overuse, and climate change** threatening its purity, our water sources need urgent protection! 🛑💔 " +
        "By reducing plastic waste 🚯, conserving water 💡🚰, and restoring wetlands 🌿🦢, we can keep our Hydrosphere **clean, thriving, and full of life**! 🌍💙 Let's cherish every drop, because without water, there is **no life**! 💧✨",
      images: ["water1.jpg", "water2.jpg", "water3.jpg", "water4.jpg", "water5.jpg", "water6.jpg"],
    },
    {
      name: "Lithosphere",
      description:
        "🌍🏔️ The **Lithosphere** is the **rock-solid** foundation of our planet—literally! 🪨💪 It includes the **crust and upper mantle**, forming the ground beneath our feet, towering mountains 🏔️, sprawling plains 🌾, and deep valleys 🌄. This rugged layer is home to **soils, minerals, and precious resources** like metals ⛏️, fossil fuels 🛢️, and gemstones 💎 that shape human civilization! 🏗️🏡 " +
        "The Lithosphere **breathes life** into ecosystems by providing fertile soil 🌱🌾 for plants to grow, anchoring forests 🌳, and forming habitats for countless creatures 🦉🦌. But **deforestation, mining, and land degradation** are threatening its stability! ⚠️💔 " +
        "To protect our planet’s **rocky shield**, we must promote **sustainable land use**, reduce soil erosion 🌿, and restore damaged landscapes 🌎💚. The Lithosphere holds Earth’s history and our future—let’s **keep it strong, fertile, and thriving**! 💪🌱✨",
      images: ["land1.jpg", "land2.jpg", "land3.jpg", "land4.jpg", "land5.jpg", "land6.jpg"],
    },
    {
      name: "Biosphere",
      description:
        "🌍💚 The **Biosphere** is the **heartbeat of our planet**—where **all life exists!** 🌱🐘🐦 From the **deepest oceans 🌊** to the **highest mountains 🏔️**, this living layer is home to **billions of species**—plants, animals, fungi, and even microscopic organisms! 🦠🌾🐋 " +
        "The Biosphere **connects all ecosystems**—lush rainforests 🌳, vast savannas 🦓, icy tundras ❄️, and coral reefs 🐠. Each organism plays a crucial role in keeping Earth **balanced**! 🌎⚖️ But **deforestation, pollution, and climate change** are threatening biodiversity! ⚠️💔 " +
        "To **protect our living world**, we must **plant more trees 🌱, reduce waste ♻️, conserve water 💧, and protect endangered species 🦏**. Every small action **keeps our Biosphere thriving**—because when nature flourishes, so do we! 🌿🌏💙",
      images: ["biosphere1.jpg", "biosphere2.jpg", "biosphere3.jpg", "biosphere4.jpg", "biosphere5.jpg", "biosphere6.jpg"],
    },
  ];

  return (
    <div className="environment-container">
      <motion.h1
        className="title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        The Four Components of the Environment
      </motion.h1>
      {components.map((component, index) => (
        <motion.div
          className="component-section"
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="component-title">{component.name}</h2>
          <p className="component-description">{component.description}</p>
          <div className="image-gallery">
            {component.images.map((image, idx) => (
              <motion.img
                key={idx}
                src={image}
                alt={component.name}
                className="component-image"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EnvironmentComponents;
