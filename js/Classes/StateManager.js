class StateManager
{
    constructor()
    {
        this.currentState;   
    }

    changeState(_newState)
    {
            this.currentState = _newState
    }
}

var gameStates=new StateManager();