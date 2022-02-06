let getAction = async (vars) => {
	const cornerMax = vars[0]===Math.max(vars);
	const cond1 = vars[0]*vars[1]*vars[2]*vars[3];
	if (vars[4]===vars[1] && vars[7]===0 && cond1) return [37, 38, 39][Math.floor(Math.random()*3)];
	const actions = [37, 37, 37, 38, 38, 38];
	if (cond1 && cornerMax)
		actions.push(39);
	const cond2 = vars[0]*vars[4]*vars[8]*vars[12];
	if (cond2 && cornerMax)
		actions.push(40);
	return actions[Math.floor(Math.random() * actions.length)];
}