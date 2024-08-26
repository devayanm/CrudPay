from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, TransactionViewSet, WalletViewSet, QRCodeViewSet, BankAccountViewSet, SupportTicketViewSet, InstantTransferView, KYCVerificationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserProfileViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'wallets', WalletViewSet)
router.register(r'qrcodes', QRCodeViewSet)
router.register(r'bank-accounts', BankAccountViewSet)
router.register(r'support-tickets', SupportTicketViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('instant-transfer/', InstantTransferView.as_view(), name='instant_transfer'),
    path('kyc-verify/', KYCVerificationView.as_view(), name='kyc_verify'),
]
