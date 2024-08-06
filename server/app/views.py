from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import UserProfile, Transaction, Wallet, QRCode, BankAccount, SupportTicket
from .serializers import UserProfileSerializer, TransactionSerializer, WalletSerializer, QRCodeSerializer, BankAccountSerializer, SupportTicketSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(user=user)


class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Wallet.objects.filter(user=user)


class QRCodeViewSet(viewsets.ModelViewSet):
    queryset = QRCode.objects.all()
    serializer_class = QRCodeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return QRCode.objects.filter(user=user)


class InstantTransferView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Implement logic for instant transfers
        pass


class KYCVerificationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Implement KYC verification logic
        pass


class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return BankAccount.objects.filter(user=user)


class SupportTicketViewSet(viewsets.ModelViewSet):
    queryset = SupportTicket.objects.all()
    serializer_class = SupportTicketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return SupportTicket.objects.filter(user=user)
