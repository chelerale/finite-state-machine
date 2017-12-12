class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
this.config = config;
this.param = [this.config.initial];
this.arrayOfStates = this.config.states;
this.index = 0;
this.flag = 0;
}
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
return this.param[this.index];
}
    /**
     * Goes to specified state.
     * @config state
     */
    changeState(state) {
      if(state in this.arrayOfStates ){
        this.param.push(state);
        this.index++;
        if(this.flag != 0)
        this.flag--;
      }else
      throw new Error("Error");
}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if(event in this.arrayOfStates[this.getState()].transitions ){
      this.changeState(this.arrayOfStates[this.getState()].transitions[event]);
      if(this.flag != 0)
      this.flag--;
    }
      else throw new Error("Error");
}
    /**
     * Resets FSM state to initial.
     */
    reset() {
    this.index = 0 ;
    this.flag = 0;
    this.param = [this.config.initial]
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

      var arrayOfTransitions = [];
      if(event){
        for (var element in this.arrayOfStates)
          if (event in this.arrayOfStates[element].transitions) {
            arrayOfTransitions.push(element);
        }
      }else {
        for (var element in this.arrayOfStates)
         arrayOfTransitions.push(element);
      }
      return arrayOfTransitions;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if(this.index > 0){
              this.index--;
          this.flag++;
              return true;
            }
        else
      return false;

    }
    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if(this.flag != 0 ){
        this.index++;
        this.flag--;
      return true;
    }else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    this.reset();
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

