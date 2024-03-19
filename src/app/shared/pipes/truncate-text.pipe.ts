import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (!value) return ''; // Manejar el caso de valor nulo o indefinido
    if (value.length <= maxLength) return value; // Retornar el valor sin modificar si es menor o igual a la longitud máxima

    // Truncar el texto y añadir puntos suspensivos al final
    return value.substring(0, maxLength) + '...';
  }
}