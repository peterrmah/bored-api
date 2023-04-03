import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AccessibilityLevel, PriceLevel } from "./types";

@Entity("users")
export class User extends BaseEntity {
  /**
   * Auto-generated primary key
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name of user
   *
   * @note 70 char max limit
   */
  @Column({ length: 70 })
  name: string;

  /**
   * User's preferred activity price level
   */
  @Column({ type: "enum", enum: PriceLevel })
  price: PriceLevel;

  /**
   * User's preferred activity accessibility level
   */
  @Column({ type: "enum", enum: PriceLevel })
  accessibility: AccessibilityLevel;

  /**
   * Account creation date
   */
  @CreateDateColumn()
  created_date: Date;
}
