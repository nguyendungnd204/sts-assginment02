import { IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: 'Product name should not be empty' })
    @Length(2, 100, { message: 'Product name must be between 2 and 100 characters' })
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Price should not be empty' })
    @IsNumber({}, { message: 'Price must be a number' })
    @Min(0, { message: 'Price must be at least 0' })
    price: number;

    @IsNotEmpty({ message: 'Stock should not be empty' })
    @IsNumber({}, { message: 'Stock must be a number' })
    @Min(0, { message: 'Stock must be at least 0' })
    stock: number;

    @IsNotEmpty({ message: 'Category should not be empty' })
    category: string;
}