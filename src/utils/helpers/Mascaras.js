export const CPF = cpf =>
  cpf && cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
export const CNPJ = cnpj =>
  cnpj &&
  cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
export const RG = rg =>
  rg && rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
export const CEP = cep => cep && cep.replace(/^(\d{5})(\d{3})/, '$1-$2');
export const Telefone = telefone =>
  telefone && telefone.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
export const Celular = telefone =>
  telefone && telefone.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
export const Data = data =>
  data && data.replace(/^(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
export const nmrValidator = nmr => {
  const re = /^[0-9]{0,11}$/;
  return re.test(nmr);
};
export const EmailValidator = email => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
export const CelularValidator = celular =>
  /\(\d{2,}\) \d{4,}-\d{4}/g.test(celular);
