
from dataclasses import asdict, dataclass

@dataclass
class User:
    username: str
    telegramId: int

    def dict(self):
        return {k: str(v) for k, v in asdict(self).items()}
