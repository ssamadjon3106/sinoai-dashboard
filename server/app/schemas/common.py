"""Shared Pydantic base config: camelCase JSON in/out over snake_case
Python fields, matching the frontend's existing (already-tested) contract.
"""

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
