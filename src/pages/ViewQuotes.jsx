import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuotes, fetchAvailability, updateQuote, deleteQuote } from '../store/bookingSlice';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { BACKEND_URL } from '../store/backend';
import './ViewQuotes.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewQuotes = () => {
  const dispatch = useDispatch();
  const { quotes, quotesLoading, quotesError, updateSuccess } = useSelector(state => state.booking);
  const availability = useSelector(state => state.booking.availability);
  const token = useSelector(state => state.auth?.token);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Replace editing boolean with editingQuoteId
  const [editingQuoteId, setEditingQuoteId] = useState(null);
  const [editForm, setEditForm] = useState({
    status: '',
    estimatedCost: '',
    notes: '',
    appointmentDate: '',
    appointmentSlot: ''
  });
  const [showAppointmentInputs, setShowAppointmentInputs] = useState(false);
  // Track if fetchAvailability was triggered
  const [availabilityRequested, setAvailabilityRequested] = useState(false);
  const [lastUpdatedQuoteId, setLastUpdatedQuoteId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(fetchQuotes());
    }
  }, [updateSuccess, dispatch]);

  // Add this useEffect to update editForm when selectedQuote changes
  useEffect(() => {
    if (selectedQuote) {
      setEditForm({
        status: selectedQuote.status || '',
        estimatedCost: selectedQuote.estimatedCost || '',
        notes: selectedQuote.notes || '',
        appointmentDate: selectedQuote.appointmentDate ? selectedQuote.appointmentDate.slice(0,10) : '',
        appointmentSlot: selectedQuote.appointmentSlot || ''
      });
    }
  }, [selectedQuote]);

  // When a quote is selected, reset editing state
  useEffect(() => {
    setEditingQuoteId(null);
  }, [selectedQuote]);

  // Helper to get quoteId from URL query
  const getQuoteIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('quoteId');
  };

  // On mount, if quoteId in URL, select that quote after quotes are fetched
  useEffect(() => {
    if (quotes && quotes.length > 0) {
      const quoteId = getQuoteIdFromQuery();
      if (quoteId) {
        const found = quotes.find(q => q._id === quoteId);
        if (found) setSelectedQuote(found);
      }
    }
  }, [quotes]);

  const handleViewMore = (quote) => {
    setSelectedQuote(quote);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuote(null);
  };

  const handleEditClick = () => {
    setEditingQuoteId(selectedQuote?._id);
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditCancel = () => {
    setEditingQuoteId(null);
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(updateQuote({
        id: selectedQuote._id,
        data: {
          status: editForm.status,
          estimatedCost: Number(editForm.estimatedCost),
          notes: editForm.notes,
          appointmentDate: editForm.appointmentDate,
          appointmentSlot: Number(editForm.appointmentSlot)
        }
      })).unwrap();

      alert('Quote updated successfully!');
      // Set quoteId in URL and reload page
      navigate(`?quoteId=${selectedQuote._id}`);
      window.location.reload();
    } catch (err) {
      alert('Error updating quote: ' + err);
    }
  };


  // After quotes are refetched, keep the last updated quote open
  useEffect(() => {
    if (lastUpdatedQuoteId && quotes && quotes.length > 0) {
      const found = quotes.find(q => q._id === lastUpdatedQuoteId);
      if (found) {
        setSelectedQuote(found);
        setLastUpdatedQuoteId(null); // Reset after use
      }
    }
  }, [quotes, lastUpdatedQuoteId]);

  const handleDateClick = async () => {
    setAvailabilityRequested(true);
    dispatch(fetchAvailability());
  };

  useEffect(() => {
    if (availabilityRequested && availability) {
      console.log('Availability response:', availability);
      setAvailabilityRequested(false);
    }
  }, [availability, availabilityRequested]);

  // Slot mapping
  const slotOptions = [
    { value: "0", label: "09:00 - 10:00" },
    { value: "1", label: "10:00 - 11:00" },
    { value: "2", label: "11:00 - 12:00" },
    { value: "3", label: "12:00 - 13:00" },
    { value: "4", label: "13:00 - 14:00" },
    { value: "5", label: "14:00 - 15:00" },
    { value: "6", label: "15:00 - 16:00" },
    { value: "7", label: "16:00 - 17:00" }
  ];

  // Get unavailable slots for selected date from availability response
  const unavailableSlots = (() => {
    if (
      availability &&
      editForm.appointmentDate &&
      availability[editForm.appointmentDate]
    ) {
      // Flatten array if needed
      return Array.isArray(availability[editForm.appointmentDate])
        ? availability[editForm.appointmentDate]
        : [];
    }
    return [];
  })();

  // Helper to get slot label from slot number
  const getSlotLabel = slotNum => {
    if (slotNum === undefined || slotNum === null || slotNum === "") return "N/A";
    const found = slotOptions.find(opt => Number(opt.value) === Number(slotNum));
    return found ? found.label : slotNum;
  };

  // Helper to format date as DD/MM/YYYY
  const formatDateDMY = dateStr => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d)) return "N/A";
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Helper to check if a date is Sunday
  const isSunday = dateStr => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    return d.getDay() === 0; 
  };

  // Helper to get today's date in YYYY-MM-DD format
  const todayStr = () => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  };

  // Helper to get the next available slot index for today
  const getNextAvailableSlotIdx = () => {
    const now = new Date();
    const currentHour = now.getHours();
    // slotOptions: [{ value: "0", label: "09:00 - 10:00" }, ...]
    // Find the first slot whose start hour is greater than current hour
    for (let i = 0; i < slotOptions.length; i++) {
      const slotHour = 9 + i; // slot 0 = 9:00, slot 1 = 10:00, etc.
      if (slotHour > currentHour) {
        return i;
      }
    }
    // If all slots are in the past, return a value greater than any slot index
    return slotOptions.length;
  };

  const handleDeleteQuote = useCallback(async () => {
    if (!selectedQuote) return;
    if (!window.confirm('Are you sure you want to delete this quote?')) return;
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/quotes/${selectedQuote._id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to delete quote');
      }
      alert('Quote deleted successfully!');
      setSelectedQuote(null);
      dispatch(fetchQuotes());
    } catch (err) {
      alert('Error deleting quote: ' + err);
    }
  }, [dispatch, selectedQuote, token]);

  // Helper function to format service type
  const formatServiceType = (serviceType, projectType) => {
    if (serviceType && projectType) {
      return `${serviceType} - ${projectType}`;
    }
    return serviceType || projectType || 'N/A';
  };

  // Helper function to format appointment date
  const formatAppointmentDate = (date) => {
    if (!date) return 'N/A';
    const appointmentDate = new Date(date);
    return appointmentDate.toLocaleDateString('en-GB');
  };

  // Helper function to get status display
  const getStatusDisplay = (status) => {
    return status === 'completed' ? 'Completed' : 'Pending';
  };

  return (
    <div className="view-quotes-page">
      <div className="quotes-container">
        <h1 className="quotes-title">Quotes</h1>
        
        {quotesLoading && <p>Loading quotes...</p>}
        {quotesError && <p style={{ color: 'red' }}>Error: {quotesError}</p>}
        
        {!quotesLoading && !quotesError && (
          <div className="quotes-table-container">
            {quotes.length === 0 ? (
              <p>No quotes found.</p>
            ) : (
              <table className="quotes-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Service / project Type</th>
                    <th>Budget</th>
                    <th>Appointment Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map(q => (
                    <tr key={q._id} className="quote-row">
                      <td className="name-cell">{q.name}</td>
                      <td className="service-cell">{formatServiceType(q.serviceType, q.projectType)}</td>
                      <td className="budget-cell">{q.budget || 'N/A'}</td>
                      <td className="date-cell">{formatAppointmentDate(q.appointmentDate)}</td>
                      <td className="status-cell">
                        <span className={`status-badge ${q.status === 'completed' ? 'completed' : 'pending'}`}>
                          {getStatusDisplay(q.status)}
                        </span>
                      </td>
                      <td className="action-cell">
                        <button 
                          className="view-more-btn"
                          onClick={() => handleViewMore(q)}
                        >
                          View More
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {/* Pagination */}
            <div className="pagination-container">
              <div className="pagination">
                <button className="pagination-btn prev-btn">‹</button>
                <button className="pagination-btn page-btn active">1</button>
                <button className="pagination-btn page-btn">2</button>
                <button className="pagination-btn page-btn">3</button>
                <button className="pagination-btn page-btn">4</button>
                <button className="pagination-btn next-btn">›</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quote Details Modal */}
      <AnimatePresence>
        {showModal && selectedQuote && (
          <motion.div
            className="quote-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="quote-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="quote-modal-header">
                <h2 className="quote-modal-title">Quote Details</h2>
                <button className="quote-modal-close" onClick={handleCloseModal}>
                  <FaTimes />
                </button>
              </div>

              <div className="quote-modal-content">
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Name:</div>
                  <div className="quote-detail-value">{selectedQuote.name}</div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Email:</div>
                  <div className="quote-detail-value">{selectedQuote.email}</div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Phone:</div>
                  <div className="quote-detail-value">{selectedQuote.phone}</div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Address:</div>
                  <div className="quote-detail-value">{selectedQuote.address}</div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Service Type:</div>
                  <div className="quote-detail-value">{selectedQuote.serviceType}</div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Project Type:</div>
                  <div className="quote-detail-value">{selectedQuote.projectType}</div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Rooms:</div>
                  <div className="quote-detail-value">
                    {Array.isArray(selectedQuote.rooms) && selectedQuote.rooms.length > 0 
                      ? selectedQuote.rooms.join(', ') 
                      : 'N/A'}
                  </div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Timeframe:</div>
                  <div className="quote-detail-value">{selectedQuote.timeframe}</div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Budget:</div>
                  <div className="quote-detail-value">{selectedQuote.budget}</div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Description:</div>
                  <div className="quote-detail-value">{selectedQuote.description}</div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Status:</div>
                  <div className="quote-detail-value">
                    <span className={`status-badge ${selectedQuote.status === 'completed' ? 'completed' : 'pending'}`}>
                      {getStatusDisplay(selectedQuote.status)}
                    </span>
                  </div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Appointment Date:</div>
                  <div className="quote-detail-value">
                    {selectedQuote.appointmentDate ? formatAppointmentDate(selectedQuote.appointmentDate) : 'N/A'}
                  </div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Appointment Slot:</div>
                  <div className="quote-detail-value">
                    {selectedQuote.appointmentSlot !== undefined && selectedQuote.appointmentSlot !== null
                      ? slotOptions.find(opt => opt.value === selectedQuote.appointmentSlot.toString())?.label || 'N/A'
                      : 'N/A'}
                  </div>
                </div>
                <div className="quote-detail-row">
                  <div className="quote-detail-label">Created At:</div>
                  <div className="quote-detail-value">
                    {selectedQuote.createdAt ? new Date(selectedQuote.createdAt).toLocaleString() : 'N/A'}
                  </div>
                </div>
              </div>

              <div className="quote-modal-actions">
                <button className="modal-btn modal-btn-primary" onClick={handleEditClick}>
                  <FaEdit />
                  Edit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewQuotes;

