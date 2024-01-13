let args = process.argv;
const playerNum = parseInt(args[2]);

type Player = {
  hand: Card[];
};

type Card = {
  suite: Suite;
  value: Value;
};

const suites = ["hearts", "diamonds", "clubs", "spades"] as const;
type Suite = (typeof suites)[number];

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
type Value = (typeof values)[number];

function makeShuffledDeck() {
  let deck: Card[] = [];
  for (let suite of suites) {
    for (let value of values) {
      deck.push({ suite: suite, value: value });
    }
  }

  let shuffledDeck = deck.sort(() => Math.random() - 0.5);
  return shuffledDeck;
}

function dealPlayers(deck: Card[], playerNum: Card) {
  let players: Player[] = [];
  for (let i = 0; i < playerNum; i++) {
    let dealtHand: Card[] = [];
    for (let j = 0; j < 3; j++) {
      dealtHand.push(deck.pop()!);
    }
    players.push({ hand: dealtHand });
  }
  return players;
}

function sumCards(hand: Card[]) {
  let sum = 0;
  for (let card of hand) {
    sum += card.value;
  }
  return sum;
}

function calculateResult(players: Player[]) {
  const playerResults = players.map((player) => ({
    player: player,
    sum: sumCards(player.hand),
  }));
  let result = playerResults.map((result) => result.sum);
  let maxResults = Math.max(...result);
  return playerResults
    .filter((result) => result.sum === maxResults)
    .map((result) => result.player);
}

function printCard(card: Card) {
  if (card.value == 1) {
    console.log(`Ace of ${card.suite}`);
  } else if (card.value == 11) {
    console.log(`Jack of ${card.suite}`);
  } else if (card.value == 12) {
    console.log(`Queen of ${card.suite}`);
  } else if (card.value == 13) {
    console.log(`King of ${card.suite}`);
  } else {
    console.log(`${card.value} of ${card.suite}`);
  }
}

function printPlayerHand(player: Player) {
  for (let card of player.hand) {
    printCard(card);
  }
}

function playGame() {
  console.log(`Starting a game with ${playerNum} players!`);
  let deck = makeShuffledDeck();
  let players = dealPlayers(deck, playerNum);
  let result = calculateResult(players);
  console.log(`Displaying all player hands:`);
  for (let player of players) {
    printPlayerHand(player);
    console.log();
  }

  if (result.length > 1) {
    console.log(`It's a tie!`);
    for (let player of result) {
      printPlayerHand(player);
      console.log();
    }
  } else {
    console.log(`The winner is:`);
    printPlayerHand(result[0]);
  }
}

playGame();
