import { IsNotEmpty } from 'class-validator';

/*
 * @Autor: GeekMzy
 * @Date: 2021-12-23 10:13:50
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-23 10:19:27
 * @FilePath: \nest2\src\logical\commodity\commodity.dto.ts
 */
export class commodity {
  @IsNotEmpty({ message: '商品_栏目ID不能为空' })
  readonly ccolumn_id: number;
  @IsNotEmpty({ message: '商品名称不能为空' })
  readonly commodity_name: string;
  @IsNotEmpty({ message: '商品描述不能为空' })
  readonly commodity_desc: string;
  @IsNotEmpty({ message: '商品价格不能为空' })
  readonly market_price: string;
  @IsNotEmpty({ message: '商品售价不能为空' })
  readonly sale_money: string;
}
