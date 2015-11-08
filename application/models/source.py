from application import db


class Source(db.Model):
    __tablename__ = 'source'

    id   = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self, name):
        self.name = name

    @property
    def serialized(self):
        return {
            'id'  : self.id,
            'name': self.name}
