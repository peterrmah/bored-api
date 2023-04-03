import { EntityManager, getManager } from "typeorm";

export abstract class Manageable {
  /**
   * Entity Manager to be used for transactions
   *
   * @protected
   */
  protected manager: EntityManager;

  /**
   * Constructor
   * - Sets the entity manager
   *
   * @param manager - entity manager to be used
   * @construct
   */
  constructor(manager: EntityManager = getManager()) {
    this.manager = manager;
  }
}
