from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('CR', 'Credit'),
        ('DR', 'Debit'),
    ]

    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(
        max_length=2, choices=TRANSACTION_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.transaction_type} - {self.amount}"


class Wallet(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    cryptocurrency = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=18, decimal_places=8, default=0.0)

    def __str__(self):
        return f"{self.user.username}'s {self.cryptocurrency} Wallet"


class QRCode(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    qr_code = models.ImageField(upload_to='qrcodes/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"QR Code for {self.user.username}"


class UserProfile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    kyc_verified = models.BooleanField(default=False)
    # Add other KYC-related fields as needed


class BankAccount(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    bank_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=20)
    ifsc_code = models.CharField(max_length=11)

    def __str__(self):
        return f"{self.bank_name} Account for {self.user.username}"


class SupportTicket(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ticket {self.id} from {self.user.username}"
