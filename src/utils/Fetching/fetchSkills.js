const fetchSkills = async (SkillId, setSkill, setError) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/pricing/${SkillId}`
    );
    if (!response.ok) throw new Error("Failed to fetch Skill data");

    const data = await response.json();
    setSkill(data); // Sets Skill data in state
  } catch (error) {
    setError(`Error fetching Skill: ${error.message}`);
  }
};

export default fetchSkills;
