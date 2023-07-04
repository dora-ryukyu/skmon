// カード情報の定義
const cards = [
	{
		name: "フレイムドラゴン",
		hp: 50,
		speed: 5,
		skills: [
			{name: "ファイアブレス", damage: 5},
			{name: "インフェルノクロー", damage: 7},
			{name: "ドラゴンウィング", damage: 4},
			{name: "フレイムバースト", damage: 6},
			{name: "メテオストライク", damage: 9},
			{name: "インフィニティフレイム", damage: 12}
		],
		effect: "炎の守護"
	},
	{
		name: "シャドウニンジャ",
		hp: 50,
		speed: 9,
		skills: [
			{name: "影手裏剣", damage: 4},
			{name: "瞬影斬", damage: 6},
			{name: "忍術・隠れ身", damage: 0},
			{name: "闇の一閃", damage: 7},
			{name: "影分身の術", damage: 0},
			{name: "暗黒衝撃波", damage: 10}
		],
		effect: "忍法・影の舞"
	}
];

// ゲームの状態
let turn = 1;
let dice = 1;
let player1 = {
	card: cards[0],
	hp: cards[0].hp,
	speed: cards[0].speed
};
let player2 = {
	card: cards[1],
	hp: cards[1].hp,
	speed: cards[1].speed
};

// 初期化処理
function init() {
	// キャラクターカードの表示
	document.querySelectorAll(".card").forEach((element, indexContinuing from the previous answer, here's an example of how you can implement the game logic in JavaScript:

```
// ゲームの状態
let turn = 1;
let dice = 1;
let player1 = {
	card: cards[0],
	hp: cards[0].hp,
	speed: cards[0].speed
};
let player2 = {
	card: cards[1],
	hp: cards[1].hp,
	speed: cards[1].speed
};

// ダイスを振る
function rollDice() {
	return Math.floor(Math.random() * 6) + 1;
}

// プレイヤーのターンを処理する
function processTurn() {
	let currentPlayer = turn === 1 ? player1 : player2;
	let otherPlayer = turn === 1 ? player2 : player1;

	// ダイスを振る
	dice = rollDice();
	document.querySelector("#player" + turn + " .dice").textContent = dice;

	// スピード比較
	if (currentPlayer.speed > otherPlayer.speed) {
		// スキルを選択する
		let skillIndex = prompt(currentPlayer.card.name + "の技を選んでください (1-" + currentPlayer.card.skills.length + ")");
		let skill = currentPlayer.card.skills[skillIndex - 1];

		// ダメージを与える
		otherPlayer.hp -= skill.damage;

		// ゲーム終了判定
		if (otherPlayer.hp <= 0) {
			document.querySelector("#message").textContent = currentPlayer.card.name + "の勝利！";
			document.querySelector("#player1 .buttons").innerHTML = "";
			document.querySelector("#player2 .buttons").innerHTML = "";
		} else {
			document.querySelector("#message").textContent = otherPlayer.card.name + "に" + skill.damage + "のダメージを与えた！";
			turn = turn === 1 ? 2 : 1;
			processTurn();
		}
	} else {
		document.querySelector("#message").textContent = currentPlayer.card.name + "はスピードが遅くて技が出せなかった！";
		turn = turn === 1 ? 2 : 1;
		processTurn();
	}
}

// 初期化処理
function init() {
	// キャラクターカードの表示
	document.querySelectorAll(".card").forEach((element, index) => {
		element.innerHTML = `
			<h3>${cards[index].name}</h3>
			<p>HP: ${cards[index].hp}</p>
			<p>Speed: ${cards[index].speed}</p>
			<p>Effect: ${cards[index].effect}</p>
		`;
	});

	// 技のボタンを表示する
	document.querySelectorAll(".buttons").forEach((element, index) => {
		element.innerHTML = "";
		cards[index].skills.forEach((skill, skillIndex) => {
			let button = document.createElement("button");
			button.textContent = skill.name;
			button.addEventListener("click", () => {
				// プレイヤーのターンを処理する
				processTurn();
			});
			element.appendChild(button);
		});
	});
}

// 初期化処理を実行する
init();
