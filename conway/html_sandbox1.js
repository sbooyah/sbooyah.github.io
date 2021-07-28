const buttonGenerationStep = document.querySelector("#generationStep");
const buttonRun = document.querySelector("#runSimulation");
document.addEventListener("click", (event) => {
	let clicked = event.target;
	if (clicked.nodeName === "DIV" && clicked.classList.contains('box')) {
		if (clicked.classList.contains("alive")) {
			clicked.classList.remove("alive");
		} else {
			clicked.classList.add("alive");
		}
	}
});
const boxes = document.querySelectorAll(".box");
var dataStore = [];

// ==================================================================

//
function getAdjacentCells(box, index) {
	const adjacentIndexes = [-31, -1, 29, -30, 30, -29, 1, 31];
	let numAliveAdjacent = 0;

	// HANDLE EDGE CASES
	if (index === 0 || index % 30 === 0) {
		adjacentIndexes.splice(0, 3);
	} else if ((index + 1) % 30 === 0) {
		adjacentIndexes.splice(5, 3);
	}

	// CHECK ADJACENT CELLS FOR ALIVE
	adjacentIndexes.forEach((ind) => {
		if (boxes[index + ind] != undefined) {
			if (boxes[ind + index].classList.contains("alive")) {
				numAliveAdjacent++;
			}
		}
	});

	return numAliveAdjacent;
}

function getState() {
	dataStore = [];
	boxes.forEach((box, index) => {
		dataStore.push({});
		let currentObj = dataStore[index];
		currentObj.index = index;
		currentObj.alive = box.classList.contains("alive");
		currentObj.neighborsAlive = getAdjacentCells(box, index);
	}) 
};



function updateState() {
    dataStore.forEach(obj => {
        //ALIVE
        if (obj.alive) {
            if (obj.neighborsAlive < 2 || obj.neighborsAlive > 3) {
                obj.alive = false;
            }
        //DEAD
        } else {
            if (obj.neighborsAlive === 3) {
                obj.alive = true;
            }
        }
    })
}

function displayState() {
	dataStore.forEach(obj => {
		let thisIndex = obj.index;
		let thisBox = boxes[thisIndex]
		if (obj.alive) {
			if (thisBox.classList.contains('alive')) {
			} else {
				thisBox.classList.add('alive')
			}
		} else {
			if (thisBox.classList.contains('alive')) {
				thisBox.classList.remove('alive')
			} else {
			}
		}
	})
}

function generationStep() {
	getState();
	updateState();
	displayState();
}

function simulationRun() {
	setInterval(generationStep, 100)
};

buttonGenerationStep.addEventListener('click', generationStep);
buttonRun.addEventListener('click', simulationRun);