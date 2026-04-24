from datetime import date
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class EstudianteCrear(BaseModel):
    nombre: str
    primer_apellido: str
    segundo_apellido: str
    correo: str
    dni: str
    fecha_nacimiento: date
    password: Optional[str] = None
    did: Optional[str] = None
    cursos: Optional[List[int]] = []
    credenciales: Optional[List[str]] = []
    

class Estudiante(BaseModel):
    NIA: int
    nombre: str
    primer_apellido: str
    segundo_apellido: str
    correo: str
    dni: str
    fecha_nacimiento: date
    did: Optional[str] = None
    cursos: Optional[List[int]] = []
    credenciales: Optional[List[str]] = []

    model_config = ConfigDict(from_attributes=True)


class EstudianteLoginRequest(BaseModel):
    user_id: str
    password: str