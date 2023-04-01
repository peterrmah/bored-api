import { IsDate, IsEnum, IsString, IsUUID } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AccessibilityLevel, PriceLevel } from "./types";

@Entity("activities")
export class Activity extends BaseEntity {
  /**
   * Auto-generated primary key
   */
  @PrimaryGeneratedColumn()
  @IsUUID()
  id: number;

  /**
   * Name of user
   *
   * @note 70 char max limit
   */
  @Column({ length: 70 })
  @IsString()
  name: string;

  /**
   * User's preferred activity price level
   */
  @Column({ type: "enum", enum: PriceLevel })
  @IsEnum(PriceLevel)
  price: PriceLevel;

  /**
   * User's preferred activity accessibility level
   */
  @Column({ type: "enum", enum: PriceLevel })
  @IsEnum(AccessibilityLevel)
  accessibility: AccessibilityLevel;

  /**
   * Account creation date
   */
  @CreateDateColumn()
  @IsDate()
  created_date: Date;
}
