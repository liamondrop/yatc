from application import db
from source import Source
from datetime import datetime


class Mention(db.Model):
    __tablename__ = 'mention'

    id = db.Column(db.Integer, primary_key=True)
    domain_id       = db.Column(db.String)
    source_id       = db.Column(db.Integer,
        db.ForeignKey('source.id'))
    source          = db.relationship(Source)
    text            = db.Column(db.String)
    associated_user = db.Column(db.String)
    seen            = db.Column(db.Boolean, default=False)
    recorded_at     = db.Column(db.DateTime, default=datetime.now)
    occurred_at     = db.Column(db.DateTime, default=datetime.now)

    def __str__(self):
        return self.text

    @property
    def serialized(self):
        return {
            'id': self.id,
            'domain_id': self.domain_id,
            'source': self.source.name,
            'text': self.text,
            'associated_user': self.associated_user,
            'seen': self.seen,
            'recorded_at': str(self.recorded_at),
            'occurred_at': str(self.occurred_at)}
