import React, { useState, useEffect } from 'react';
import { X, MapPin, User, Phone, Home, CreditCard, DollarSign, MessageCircle, Truck, Package } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
}

export interface OrderData {
  orderId: string;
  customerInfo: CustomerInfo;
  deliveryZone: any;
  deliveryCost: number;
  items: any[];
  subtotal: number;
  transferFee: number;
  total: number;
  cashTotal?: number;
  transferTotal?: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (orderData: OrderData) => void;
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

export function CheckoutModal({ isOpen, onClose, onCheckout, items, total }: CheckoutModalProps) {
  // Usar el contexto admin para obtener zonas de entrega en tiempo real
  const { state: adminState } = useAdmin();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    address: ''
  });
  
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtener zonas de entrega del contexto admin
  const deliveryZones = adminState.deliveryZones || [];

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCustomerInfo({ fullName: '', phone: '', address: '' });
      setDeliveryType('pickup');
      setSelectedZone(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (deliveryType === 'delivery' && !selectedZone) {
      alert('Por favor selecciona una zona de entrega');
      return;
    }

    setIsSubmitting(true);

    const deliveryCost = deliveryType === 'delivery' ? (selectedZone?.cost || 0) : 0;
    const deliveryZoneText = deliveryType === 'delivery' 
      ? selectedZone?.name || 'Zona no especificada'
      : 'Recogida en tienda';

    const orderData: OrderData = {
      orderId: `TV-${Date.now()}`,
      customerInfo,
      deliveryZone: deliveryZoneText,
      deliveryCost,
      items,
      subtotal: total,
      transferFee: 0,
      total: total + deliveryCost
    };

    onCheckout(orderData);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-xl mr-4">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Finalizar Pedido</h2>
                <p className="text-blue-100">Completa tus datos para procesar el pedido</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Customer Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Información del Cliente</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.fullName}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+53 5XXXXXXX"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección *
                </label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu dirección completa"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Truck className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Opciones de Entrega</h3>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={deliveryType === 'pickup'}
                    onChange={(e) => setDeliveryType(e.target.value as 'pickup' | 'delivery')}
                    className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-900">Recogida en Tienda</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Sin costo adicional</p>
                  </div>
                  <span className="font-bold text-green-600">GRATIS</span>
                </label>
                
                <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="delivery"
                    checked={deliveryType === 'delivery'}
                    onChange={(e) => setDeliveryType(e.target.value as 'pickup' | 'delivery')}
                    className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-900">Entrega a Domicilio</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Costo según zona de entrega</p>
                  </div>
                </label>
              </div>
              
              {/* Delivery Zones */}
              {deliveryType === 'delivery' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Zona de Entrega *
                  </label>
                  {deliveryZones.length > 0 ? (
                    <select
                      value={selectedZone?.id || ''}
                      onChange={(e) => {
                        const zone = deliveryZones.find(z => z.id === parseInt(e.target.value));
                        setSelectedZone(zone);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecciona una zona</option>
                      {deliveryZones.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.name} - ${zone.cost.toLocaleString()} CUP
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        No hay zonas de entrega configuradas. Por favor contacta al administrador.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} elementos)</span>
                  <span className="font-medium">${total.toLocaleString()} CUP</span>
                </div>
                
                {deliveryType === 'delivery' && selectedZone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entrega ({selectedZone.name.split(' > ')[2]})</span>
                    <span className="font-medium">+${selectedZone.cost.toLocaleString()} CUP</span>
                  </div>
                )}
                
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">
                      ${(total + (deliveryType === 'delivery' && selectedZone ? selectedZone.cost : 0)).toLocaleString()} CUP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Enviar Pedido por WhatsApp
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}