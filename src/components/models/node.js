export class Node {
  constructor(name, fx, fy) {
    this.name = name;
    this.fx = fx
    this.fy = fy
  }

  setX(fx){
    this.fx = fx
  }
  setY(fy){
    this.fy = fy
  }

  getX(){
    return this.fx
  }
  getY(){
    return this.fy
  }

  getName(){
    return this.name
  }
}