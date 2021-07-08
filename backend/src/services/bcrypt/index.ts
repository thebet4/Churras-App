import bcrypt from 'bcrypt'

export async function encrypt(text: string){
  const salt = bcrypt.genSaltSync();
  let hash = await bcrypt.hashSync(text, salt);  
  return hash;
}

export async function decrypt(text :string, hash :string){
  const valid = await bcrypt.compareSync(text,hash);
  return valid;
}