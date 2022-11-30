'use strict';

class Voter {
  /**
   *
   * Voter
   *
   * Constructor for a Voter object. Voter has a voterId and  the object of a registrar
   *  
   * @param items - an array of choices 
   * @param election - what election you are making ballots for 
   * @param voterId - the unique Id which corresponds to a registered voter
   * @returns - registrar object
   */
  constructor(voterId, registrarId, firstName, lastName) {

    if (this.validateVoter(voterId) && this.validateRegistrar(registrarId)) {

      this.voterId = voterId;
      this.registrarId = registrarId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.ballotCreated = false;
      this.type = 'voter';
      if (this.__isContract) {
        delete this.__isContract;
      }
      if (this.name) {
        delete this.name;
      }
      return this;

    } else if (!this.validateVoter(voterId)) {
      throw new Error('the voterId is not valid.');
    } else {
      throw new Error('the registrarId is not valid.');
    }

  }

  /**
   *
   * validateVoter
   *
   * check for valid ID card - stateID or drivers License.
   *  
   * @param voterId - an array of choices 
   * @returns - yes if valid Voter, no if invalid
   */
  async validateVoter(voterId) {
    //VoterId error check if ID is Valid
    if (voterId) {
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * validateRegistrar
   * A government check could be done to verify the ID of the Registrar Admin through an api call
   * @param voterId - an array of choices 
   * @returns - yes if valid Voter, no if invalid
   */
  async validateRegistrar(registrarId) {
    //registrarId error check
    if (registrarId) {
      return true;
    } else {
      return false;
    }
  }

}
module.exports = Voter;