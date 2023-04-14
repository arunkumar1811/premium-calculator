export class Occupation {
    public name: string;
    public ratting: string;    
  }

export const map = new Map<string, number>();
map.set('Professional', 1);
map.set('White Collar', 1.25);
map.set('Light Manual', 1.50);
map.set('Heavy Manual', 1.75);