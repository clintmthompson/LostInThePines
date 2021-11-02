//VARIABLES
var wood = 0
var fire = false
var fireLife = 0
var shelter = false
var shelterCondition = 0
var hunger = 100
var foodItems = [
    {
        'name': '',
        'hungerPoints': 0,
        'quantity': 0
    },
    {
        'name': 'berries',
        'hungerPoints': 50,
        'quantity': 0
    },
    {
        'name': 'squirrel',
        'hungerPoints': 100,
        'quantity': 0
    },
    {
        'name': '',
        'hungerPoints': 0,
        'quantity': 0
    },
    {
        'name': 'onions',
        'hungerPoints': 25,
        'quantity': 0
    },
]
var huntResults = [
    {
        'displayMessage': 'After wandering for hours, you return empty handed',
        'item': ''

    },
    {
        'displayMessage': 'You manage to scrounge a handfull of berries',
        'item': 'berries'

    },
    {
        'displayMessage': 'You find a squirrel, and manage to kill it with a stick',
        'item': 'squirrel'

    },
    {
        'displayMessage': 'You see a squirrel, but he gets away',
        'item': ''

    },
    {
        'displayMessage': 'You come across and harvest a cluster of wild onions',
        'item': 'onions'

    }

]


//Functions to add functionality to buttons
document.getElementById('gatherWood').onclick = getWood
document.getElementById('buildShelter').onclick = buildShelter
document.getElementById('buildFire').onclick = buildFire
document.getElementById('hunt').onclick = goHunt

//Gathers wood
function getWood(){

        wood = wood += 1
        $('#resources').html(`Resources: <br> Wood: ${wood}`)        
        document.getElementById('gatherWood').disabled = true;
        setTimeout(function() {
            document.getElementById('gatherWood').disabled = false;
        }, 20);
        
        console.log(wood, fire)

        return wood
}


//CODE RESPONSIBLE FOR SHELTER BELOW

//Builds a shelter
function buildShelter(){
    if(wood >= 1){

        //Cost of shelter
        wood -= 1;

        //How long shelter lasts
        shelterCondition = 100


        //updates display
        $('#shelterLeft').html(`Condition of shelter: ${shelterCondition}%`)  
        $("#buildShelter").html('Repair Shelter')
        $('#resources').html(`Resources: <br> Wood: ${wood}`)
        
        //textbox conditionals
        if(shelter == false){
            $( "#textWindow" ).html("You have built a shelter!")
        }
        else if(shelter != false){
            $( "#textWindow" ).html("You repair your shelter")
        }

        //activates shelter
        shelter = true

        //calls function that reduces condition of shelter
        shelterConditionCountdown()
    }
    else{
        $( "#textWindow" ).html("You need more wood to build a shelter")
    }
}

//Reduces condition of shelter
function shelterConditionCountdown(){
    if(shelter == true && shelterCondition > 0){
        shelterCondition -= 1
        setTimeout(function() { shelterConditionCountdown(); }, 5000)
        $('#shelterLeft').html(`Contition of Shelter: ${shelterCondition}%`)

        return shelterCondition
        
    }
    else{
        shelter = false
        $("#buildShelter").html('Build Shelter')
        $( "#textWindow" ).html("Your shelter has been destroyed!")
    }
}


// CODE RESPONSIBLE FOR FIRE BELOW

//Builds a fire
function buildFire(){
    if(wood >= 1){
        
        //cost of fire
        wood -= 1;
        
        //how long fire lasts
        fireLife += 60

        //updates display
        $('#fireLeft').html(`Time left on fire: ${fireLife}`)
        $("#buildFire").html('Add wood to fire')
        $('#resources').html(`Resources: <br> Wood: ${wood}`)

        //text box conditionals
        if(fire == false){
            $( "#textWindow" ).html("You have built a fire!")
        }
        else if(fire != false){
            $( "#textWindow" ).html("You throw another log on the fire")
        }
        
        //activates fire
        fire = true

        //calls function that counts down life of fire
        maintainFire()
    }
    //not enough resources message
    else{
        $( "#textWindow" ).html("You need more wood to build a fire")
    }
}

//Fire consumption
function maintainFire(){
    if(fire == true && fireLife > 0){
        fireLife -= 1
        setTimeout(function() { maintainFire(); }, 2000)
        $('#fireLeft').html(`Time left on fire: ${fireLife}`)
        console.log(fire)
        return fireLife
        
    }
    else{
        fire = false
        $("#buildFire").html('Add wood to fire')
        $( "#textWindow" ).html("Your fire has gone out!")
    }
}


//CODE RESPONSIBLE FOR HUNGER BELOW

//Displays hunger meter
$( '#hunger' ).ready(function() {
    $( '#hunger' ).html(`Time until starvation: ${hunger}`);
    getHungry()
});

//Increases hunger level
function getHungry(){
    if(hunger > 0){
        hunger -= .5
        setTimeout(function() { getHungry(); }, 2000)
        $( '#hunger' ).html(`Time until starvation: ${hunger}`);
        return hunger}
    else{
        $('#textWindow').html('You have starved to death')
    }
}


//CODE RESPONSIBLE FOR FOOD BELOW



function goHunt(){
    let selection = Math.floor(Math.random() * huntResults.length)
    if (huntResults[selection].item != ''){
    foodItems[selection].quantity += 1
    console.log(foodItems)
}

    $('#food').html(
            `<table>
                <tr>
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>Eat</th>
                </tr>
                <tr>
                    <th>${foodItems[1].name}</th>
                    <th>${foodItems[1].quantity}</th>
                    <th><button>50 hp</button></th>
                </tr>
                <tr>
                    <th>${foodItems[2].name}</th>
                    <th>${foodItems[2].quantity}</th>
                    <th><button>100 hp</button></th>
                </tr>
                <tr>
                    <th>${foodItems[4].name}</th>
                    <th>${foodItems[4].quantity}</th>
                    <th><button>25 hp</button></th>
                </tr>
            </table>`)
    
    $('#textWindow').html(`${huntResults[selection].displayMessage}`)

    if(food != []){
        $('#foodHeading').html('Food:')
    }
}