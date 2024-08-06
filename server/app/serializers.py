from rest_framework import serializers
from .models import UserProfile, Transaction, Wallet, QRCode, BankAccount, SupportTicket



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'phone_number', 'address']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user', 'amount', 'transaction_type', 'created_at']


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['user', 'cryptocurrency', 'balance']


class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = ['user', 'qr_code', 'created_at']


class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ['user', 'bank_name', 'account_number', 'ifsc_code']


class SupportTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportTicket
        fields = ['user', 'subject', 'message', 'resolved', 'created_at']
