/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 15:42:37
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-21 15:44:44
 * @FilePath: \nodeProject\nest1\src\cats\dto\list-all-entities.dto.ts
 */
import { UpdateCatDto } from './update-cat.dto';
export class ListAllEntities {
  items: UpdateCatDto[];
}
