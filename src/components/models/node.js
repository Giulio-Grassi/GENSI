export class Node {
  constructor(name, fx, fy, isFixed = false) {
    this.name = name;
    this.fx = fx
    this.fy = fy
    this.isFixed = isFixed
  }

  setX = (fx) => {
    this.fx = fx
  }
  setY = (fy) => {
    this.fy = fy
  }
  setIsFixed = (isFixed) => {
    this.isFixed = isFixed
  }

  getX = () => {
    return this.fx
  }
  getY = () => {
    return this.fy
  }
  getIsFixed = () => {
    return this.isFixed
  }

  getName = () => {
    return this.name
  }
}