interface DocStorage {
  getDoc(id:number) : Buffer,
  putDoc(data:Buffer) :number
}