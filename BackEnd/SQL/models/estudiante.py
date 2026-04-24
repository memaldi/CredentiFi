from sqlalchemy import Date, ForeignKey, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta
from models.solicitud import solicitud



estudiante = Table("estudiante", meta, 
                Column("NIA", Integer, primary_key=True, autoincrement=True), 
                Column("nombre", String(255)),
                Column("primer_apellido", String(255)),
                Column("segundo_apellido", String(255)),
                Column("correo", String(255)),
                Column("dni", String(255)),
                Column("fecha_nacimiento", Date),
                Column("password", String(255), nullable=True),
                Column("did", String(255), nullable=True))

